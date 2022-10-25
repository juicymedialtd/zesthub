-- AlterEnum
ALTER TYPE "HolidayType" ADD VALUE 'birthday';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER';

-- AlterTable
ALTER TABLE "Documents" ADD COLUMN     "folder" BOOLEAN DEFAULT false,
ADD COLUMN     "folderContents" JSONB;
