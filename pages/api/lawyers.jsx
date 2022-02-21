import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const { field, location } = req.query;
  if (req.method !== "GET") {
    res.status(400).json({ error: "We do not currently support this Method" });
    return;
  }
  if (field !== "null" && location !== "null") {
    const data = await prisma.lawyer_fields.findMany({
      where: {
        fields_of_law: {
          field: {
            contains: field,
            mode: "insensitive"
          }
        },
        lawyers: {
          location: {
            startsWith: location,
            mode: "insensitive"
          }
        }
      },
      include: {
        fields_of_law: true,
        lawyers: true
      }
    });
    const parsedLawyers = data.map((item) => {
      return { ...item.lawyers };
    });

    res.status(200).json(parsedLawyers);
    return;
  } else if (field !== "null" && location === "null") {
    const filteredByField = await prisma.lawyer_fields.findMany({
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
        lawyers: true
      }
    });
    const parsedLawyers = filteredByField.map((item) => ({ ...item.lawyers }));
    res.json(parsedLawyers);
    return;
  } else if (location !== "null" && field === "null") {
    const lawyersFromLocation = await prisma.lawyers.findMany({
      where: {
        location: {
          startsWith: location,
          mode: "insensitive"
        }
      }
    });
    res.status(200).json(lawyersFromLocation);
  } else {
    const lawyersFromLocation = await prisma.lawyers.findMany();
    res.status(200).json(lawyersFromLocation);
  }
}
