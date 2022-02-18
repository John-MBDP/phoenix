const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const createManyFirmMembers = await prisma.lawfirm_members.createMany({
    data: [
      {
        lawyer_id: 1,
        lawfirm_id: 5,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 2,
        lawfirm_id: 5,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 3,
        lawfirm_id: 4,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 4,
        lawfirm_id: 4,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 5,
        lawfirm_id: 3,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 6,
        lawfirm_id: 2,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 7,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 8,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 9,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 10,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
    ],
  });
  const createFieldsOfLaw = await prisma.fields_of_law.createMany({
    data: [
      { field: "Injury" },
      { field: "Immigration" },
      { field: "Criminal" },
      { field: "Legal Assistance" },
      { field: "NFT's" },
    ],
  });
  const createlawyerFieldData = await prisma.lawyer_fields.createMany({
    data: [
      {
        lawyers_id: 1,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 1,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 1,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 2,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 2,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 2,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 3,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 3,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 3,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 4,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 4,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      ,
      {
        lawyers_id: 5,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 6,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 6,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 6,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 7,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 7,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 7,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 8,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 8,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 9,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 9,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 9,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 10,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
    ],
  });
  const createManyLawyers = await prisma.lawyers.createMany({
    data: [
      {
        first_name: "Dusty",
        last_name: "Luck",
        email: "goingdust@gmail.com",
        description: "I'll make sure you and your dog see justice served.",
        location: "Toronto",
        education: "Herverd",
        date_certified: "04/11/2014",
        phone_number: "705-739-5555",
        address: "55 Yonge St, Toronto, ON M6E 5A5",
        rating: 38,
        profile_pic: "/images/lawyers/dusty-profile.jpg",
      },
      {
        first_name: "John",
        last_name: "Artuz",
        email: "uwu@hotmail.com",
        description: "Console.log Expert.",
        location: "Toronto",
        education: "Yalle",
        date_certified: "06/11/2016",
        phone_number: "647-789-3344",
        address: "900 Dundas St W, Toronto, ON M6E 9B0",
        rating: 41,
        profile_pic: "",
      },
      {
        first_name: "Justin",
        last_name: "Diaz",
        email: "nani@yahoo.com",
        description: "Serving North America for 50 years, from Toronto to Anchorage.",
        location: "Toronto",
        education: "Berkalay",
        date_certified: "05/12/1972",
        phone_number: "416-090-0546",
        address: "841 Adelaide St W, Toronto, ON M5N 4R2",
        rating: 42,
        profile_pic: "",
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
