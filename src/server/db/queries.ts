import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
  type DB_FileType,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
export const QUERIES = {
  getAllParentsForFolder: async (folderId: number) => {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) throw new Error("Parent folder not found");

      parents.unshift(folder[0]);
      currentId = folder[0].parent;
    }
    return parents;
  },

  getFiles: async (folderId: number) => {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));
  },

  getFolders: async (folderId: number) => {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));
  },
};

export const MUTATIONS = {
  createFile: async (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) => {
    return await db.insert(filesSchema).values(input.file);
  },
};
