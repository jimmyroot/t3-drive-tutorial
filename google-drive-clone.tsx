"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Upload,
  MoreVertical,
  Folder,
  FileText,
  ImageIcon,
  FileVideo,
  Music,
  Archive,
  Star,
  Trash2,
  Users,
  ChevronRight,
} from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "folder" | "file"
  fileType?: "document" | "image" | "video" | "audio" | "archive" | "other"
  size?: string
  modified: string
  starred?: boolean
  url?: string
  children?: FileItem[]
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Work Documents",
    type: "folder",
    modified: "Dec 15, 2024",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "file",
        fileType: "document",
        size: "2.4 MB",
        modified: "Dec 14, 2024",
        url: "#",
      },
      {
        id: "1-2",
        name: "Budget Spreadsheet.xlsx",
        type: "file",
        fileType: "document",
        size: "1.8 MB",
        modified: "Dec 13, 2024",
        url: "#",
      },
      {
        id: "1-3",
        name: "Meeting Notes",
        type: "folder",
        modified: "Dec 12, 2024",
        children: [
          {
            id: "1-3-1",
            name: "Q4 Planning.txt",
            type: "file",
            fileType: "document",
            size: "45 KB",
            modified: "Dec 12, 2024",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "Dec 10, 2024",
    children: [
      {
        id: "2-1",
        name: "vacation-beach.jpg",
        type: "file",
        fileType: "image",
        size: "3.2 MB",
        modified: "Dec 10, 2024",
        starred: true,
        url: "#",
      },
      {
        id: "2-2",
        name: "family-dinner.png",
        type: "file",
        fileType: "image",
        size: "2.8 MB",
        modified: "Dec 9, 2024",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    name: "presentation.pptx",
    type: "file",
    fileType: "document",
    size: "5.6 MB",
    modified: "Dec 8, 2024",
    starred: true,
    url: "#",
  },
  {
    id: "4",
    name: "demo-video.mp4",
    type: "file",
    fileType: "video",
    size: "45.2 MB",
    modified: "Dec 7, 2024",
    url: "#",
  },
  {
    id: "5",
    name: "backup.zip",
    type: "file",
    fileType: "archive",
    size: "128 MB",
    modified: "Dec 5, 2024",
    url: "#",
  },
]

export default function Component() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"])
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData)
  const viewMode = "list"

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") {
      return <Folder className="w-6 h-6 text-blue-500" />
    }

    switch (item.fileType) {
      case "document":
        return <FileText className="w-6 h-6 text-blue-600" />
      case "image":
        return <ImageIcon className="w-6 h-6 text-green-600" />
      case "video":
        return <FileVideo className="w-6 h-6 text-red-600" />
      case "audio":
        return <Music className="w-6 h-6 text-purple-600" />
      case "archive":
        return <Archive className="w-6 h-6 text-orange-600" />
      default:
        return <FileText className="w-6 h-6 text-gray-600" />
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentPath([...currentPath, item.name])
      setCurrentItems(item.children)
    } else if (item.type === "file" && item.url) {
      window.open(item.url, "_blank")
    }
  }

  const navigateToPath = (index: number) => {
    if (index === 0) {
      setCurrentPath(["My Drive"])
      setCurrentItems(mockData)
    } else {
      // In a real app, you'd navigate to the specific folder
      // For this demo, we'll just go back to root
      setCurrentPath(["My Drive"])
      setCurrentItems(mockData)
    }
  }

  return (
    <div className="h-screen bg-gray-900 p-6">
      {/* Main Content */}
      <div className="flex flex-col h-full max-w-7xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-base">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center gap-1">
                <button
                  onClick={() => navigateToPath(index)}
                  className="text-gray-300 hover:text-gray-100 hover:underline"
                >
                  {path}
                </button>
                {index < currentPath.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 py-3 text-base">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
          </div>
        </div>

        {/* File List Container */}
        <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
          {/* Column Headers */}
          <div className="sticky top-0 bg-gray-800 px-6 py-4 border-b border-gray-600">
            <div className="flex items-center gap-4 text-base font-bold text-gray-400">
              <div className="w-6"></div> {/* Icon space */}
              <div className="flex-1 min-w-0">Name</div>
              <div className="w-20 text-right">Type</div>
              <div className="w-20 text-right">Size</div>
              <div className="w-32 text-right">Date Modified</div>
              <div className="w-8"></div> {/* Actions space */}
            </div>
          </div>

          {/* File List */}
          <div className="overflow-auto h-full">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-4 px-6 p-4 hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-700/50"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative w-6">
                  {getFileIcon(item)}
                  {item.starred && <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 fill-current" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium text-gray-200 truncate">{item.name}</div>
                </div>

                <div className="w-20 text-right">
                  <span className="text-base text-gray-300 capitalize">
                    {item.type === "folder" ? "Folder" : item.fileType || "File"}
                  </span>
                </div>

                <div className="w-20 text-right">
                  <span className="text-base text-gray-300">{item.size || "—"}</span>
                </div>

                <div className="w-32 text-right">
                  <span className="text-base text-gray-300">{item.modified}</span>
                </div>

                <div className="w-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem>
                        <Star className="w-4 h-4 mr-2" />
                        {item.starred ? "Remove from starred" : "Add to starred"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Move to trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
