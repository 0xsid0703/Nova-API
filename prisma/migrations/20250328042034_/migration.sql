-- CreateTable
CREATE TABLE "Coldkey" (
    "id" SERIAL NOT NULL,
    "coldkey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coldkey_pkey" PRIMARY KEY ("id")
);
