import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function SandboxPage() {
  const user = await auth();

  if (!user.userId) throw new Error("User does not exist");

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));

  return (
    <div className="flex flex-col gap-4">
      Seed Function{" "}
      <form
        action={async () => {
          "use server";
          console.log("Sup nerds");
          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found");
          }

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: null,
            })
            .$returningId();

          const foldersToInsert = mockFolders.map((folder) => ({
            ownerId: user.userId,
            name: folder.name,
            parent: rootFolder[0]!.id,
            createdAt: new Date(),
          }));

          await db.insert(folders_table).values(foldersToInsert);

          // const filesToInsert = mockFiles.map((file) => ({
          //   name: file.name,
          //   ownerId: user.userId,
          //   parent: file.parent
          // }));

          // const folderInsert = await db.insert(folders_table).values(
          //   ,
          // );

          // const fileInsert = await db.insert(files).values(
          //   mockFiles.map((file, index) => ({
          //     id: index + 1,
          //     name: file.name,
          //     size: 50000,
          //     url: file.url,
          //     parent: (index % 3) + 1,
          //   })),
          // );

          // console.log(folderInsert, fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
      {folders && folders.map((folder) => <p>{folder.name}</p>)}
    </div>
  );
}
