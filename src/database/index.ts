import { AppDataSource } from "ride-hailing-entities/build/ormconfig";

const initializeDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database successfully initialized");
  } catch (error) {
    console.log(`Database failed to connect ${error}`);
  }
};

export default initializeDB;