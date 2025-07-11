"use client";

// import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
// import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "~/app/f/FileRow";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";

export default function GoogleDriveClone(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
}) {
  const navigate = useRouter();
  const currentFolderId = props.parents[props.parents.length - 1]?.id;

  // Need to check if this works
  if (!props.parents[0] == null)
    throw new Error("Cannot proceed, can't find parent folder");
  if (!currentFolderId)
    throw new Error("Cannot proceed, can't find current folder");

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {/* <Link href="/f/1">My Drive</Link> */}
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                {index !== 0 && (
                  <ChevronRight className="mx-2 text-gray-500" size={16} />
                )}
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name === "root" ? "My Drive" : folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {/* <Button
            // onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload File
          </Button> */}
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <UploadButton
          className="mt-4"
          endpoint={"driveUploader"}
          input={{ folderId: currentFolderId }} // Might need to change if this breaks something
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
        />
      </div>
    </div>
  );
}
