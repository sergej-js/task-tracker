import { Prisma } from "@prisma/client";

const taskWithExecutors = Prisma.validator<Prisma.TaskDefaultArgs>()({
    include: {
        executors: {
            include: {
                user: true,
            }
        }
    },
});

export type TaskWithExecutors = Prisma.TaskGetPayload<typeof taskWithExecutors>