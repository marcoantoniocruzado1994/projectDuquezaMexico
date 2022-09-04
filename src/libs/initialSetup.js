import Role from "../models/Role";

export const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount(); //verificamos que existan roles

    if (count > 0) {
      return;
    }
    const values = await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
