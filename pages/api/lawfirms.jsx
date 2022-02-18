import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { field, location } = req.query;
  console.log(field, location, "uwu");
  if (req.method !== "GET") {
    res.status(400).json({ error: "We do not currently support this Method" });
    return;
  }
  if (field !== "null" && location !== "null") {
    const data = await prisma.lawfirm_fields.findMany({
      where: {
        fields_of_law: {
          field: {
            contains: field,
            mode: "insensitive"
          }
        },
        lawfirms: {
          location: {
            startsWith: location,
            mode: "insensitive"
          }
        }
      },
      include: {
        fields_of_law: true,
        lawfirms: true
      }
    });
    const parsedLawfirms = data.map((item) => {
      return { ...item.lawfirms };
    });

    console.log(parsedLawfirms, "uwu humui");
    res.status(200).json(parsedLawfirms);
    return;
  } else if (field !== "null" && location === "null") {
    console.log(field, location, "potato");

    const filteredByField = await prisma.lawfirm_fields.findMany({
      where: {
        fields_of_law: {
          field: {
            contains: field,
            mode: "insensitive"
          }
        }
      },
      include: {
        fields_of_law: true,
        lawfirms: true
      }
    });
    const parsedLawfirms = filteredByField.map((item) => ({
      ...item.lawfirms
    }));
    console.log(parsedLawfirms);
    res.json(parsedLawfirms);
    return;
  } else if (location !== "null" && field === "null") {
    const lawfirmsFromLocation = await prisma.lawfirms.findMany({
      where: {
        location: {
          startsWith: location,
          mode: "insensitive"
        }
      }
    });

    console.log(lawfirmsFromLocation, location);
    res.status(200).json(lawfirmsFromLocation);
    return;
  } else {
    console.log(field, location, "huehueheuhuehueehu");
    const lawfirmsFromLocation = await prisma.lawfirms.findMany();
    console.log(lawfirmsFromLocation);
    res.status(200).json(lawfirmsFromLocation);
    return;
  }
}
