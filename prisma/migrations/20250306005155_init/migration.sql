-- CreateTable
CREATE TABLE "WaterLevel" (
    "id" SERIAL NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "location" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterLevel_pkey" PRIMARY KEY ("id")
);
