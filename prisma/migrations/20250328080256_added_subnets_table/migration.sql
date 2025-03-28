-- CreateTable
CREATE TABLE "Subnets" (
    "id" SERIAL NOT NULL,
    "subnet" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subnets_pkey" PRIMARY KEY ("id")
);
