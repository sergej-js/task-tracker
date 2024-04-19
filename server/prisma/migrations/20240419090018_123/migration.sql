-- DropForeignKey
ALTER TABLE "UsersOnTasks" DROP CONSTRAINT "UsersOnTasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnTasks" DROP CONSTRAINT "UsersOnTasks_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnTasks" ADD CONSTRAINT "UsersOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTasks" ADD CONSTRAINT "UsersOnTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
