import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  driveUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "1GB",
      maxFileCount: 999,
    },
  })
    .input(
      z.object({
        folderId: z.number(),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const user = await auth();
      const folder = await QUERIES.getFolderById(input.folderId);

      // If you throw, the user will not be able to upload
      if (!user.userId)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError("Unauthorized");

      if (!folder)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError(
          "Required parent folder metadata is missing",
        );

      if (user.userId !== folder.ownerId)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, parentId: folder.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      await MUTATIONS.createFile({
        file: {
          parent: metadata.parentId,
          name: file.name,
          size: file.size,
          url: file.ufsUrl,
        },
        userId: metadata.userId,
      });
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
