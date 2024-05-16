import { db } from "@vercel/postgres";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const parseCSV = async (_filePath) => {
  const csvFile = fs.readFileSync(path.resolve(_filePath));
  return new Promise((resolve) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

async function seed(_client) {
  const createTables = await _client.sql`
    CREATE TABLE Account (
        User_ID SMALLINT PRIMARY KEY,
        User_Role VARCHAR(8),
        User_Gender VARCHAR(6),
        User_Pic VARCHAR,
        Firstname VARCHAR(50),
        Lastname VARCHAR(50),
        Birthday DATE,
        Tel VARCHAR(10),
        Email VARCHAR(100) UNIQUE,
        Pass INT ,
        Description VARCHAR(500)
    );
    `;
  const insertData = await _client.sql`
    INSERT INTO Account (User_ID, User_Role, User_Gender, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description)
    VALUES (1, maid, male, CDCYCULJKBJ, อำนวย, คงควรคอย, 1998-01-11, 0981675344, Aumnuay@gmail.com, abc1234567890, งานเนี้ยบ จากประสบการณ์มากกว่า 10 ปี เริ่มทำงานบ้านตั้งแต่จบประถม สนใจติดต่อได้เลย ไม่ว่าจะจากเบอร์ อีเมล หรือทางแชทก็ได้);
    INSERT INTO Account (User_ID, XYKZJHGCDT, User_Role, User_Gender, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description)
    VALUES (2, maid, female, CIXYJCVGHJVJD, ฐิตาภา, ปิติจำเริญ, 1981-11-29, 0628745045, boiin4x@gmail.com, abc1234567890, งานเนี้ยบ จากประสบการณ์มากกว่า 10 ปี เริ่มทำงานบ้านตั้งแต่จบประถม สนใจติดต่อได้เลย ไม่ว่าจะจากเบอร์, อีเมล หรือทางแชทก็ได้ 	);
    INSERT INTO Account (User_ID, User_Role, User_Gender, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description)
    VALUES (3, maid	female, YKXHXJXHMGS, ชุติมณฑน์, ตั้งตระกูลเจริญ, 1983-07-09, 0622868985, saxianghao@gmail.com, abc1234567890, งานเนี้ยบ จากประสบการณ์มากกว่า 10 ปี เริ่มทำงานบ้านตั้งแต่จบประถม สนใจติดต่อได้เลย ไม่ว่าจะจากเบอร์, อีเมล หรือทางแชทก็ได้ );
    INSERT INTO Account (User_ID, User_Role, User_Gender, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description)
    VALUES (29, customer, male, ULCJHCFYYV, กีรตาพันธ์, มาลัย, 2003-08-15, 0623988465, keerataphant@gmail.com, abc1234567915, สนใจแม่บ้านมากประสบการณ์ ทำงานเป็น job ราคากันเอง);
    `;
  return { createTables, insertData };
}

async function main() {
  const client = await db.connect();
  try {
    await seed(client);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("error occurred while attempting to seed the database", err);
});
