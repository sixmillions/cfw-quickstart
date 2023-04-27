import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";

const app = new Hono();

app.get("/", (c) => c.text("Home Page.")); // http://localhost:8787

// 获取前一百条
// curl http://localhost:8787/logs
// app.get("/logs", async (c) => {
//   const prisma = db(c.env.DATABASE_URL);
//   const res = await prisma.fileUploadHistory.findMany({ take: 100 });
//   return c.json(res);
// });

// 复杂查询
// curl http://localhost:8787/logs?fileName=logo
app.get("/logs", async (c) => {
  const prisma = db(c.env.DATABASE_URL);
  const { fileName } = c.req.query()
  console.log("fileName: ", fileName);
  const where = fileName ? { fileName: { contains: fileName } } : {}; // 根据name模糊查询
  const res = await prisma.fileUploadHistory.findMany({
    where,
    take: 100,
    orderBy: { id: "desc" }, //按id倒序排序
  });
  return c.json(res);
});

// 根据id查询
// curl http://localhost:8787/logs/1
app.get("/logs/:id", async (c) => {
  const prisma = db(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const res = await prisma.fileUploadHistory.findMany({
    where: {
      id: parseInt(id),
    },
    take: 100,
  });
  return c.json(res);
});

// 保存
// curl -X POST -d '{"fileUrl":"https://s.6bw.fun/0/favicon.ico","fileName":"favicon.ico"}' localhost:8787/logs
app.post("/logs", async (c) => {
  const prisma = db(c.env.DATABASE_URL);
  const body = await c.req.json();
  const res = await prisma.fileUploadHistory.create({ data: body });
  return c.json(res);
});

// 更新
// curl -X PUT -d '{"fileName":"testName"}' localhost:8787/logs/1
app.put("/logs/:id", async (c) => {
  const prisma = db(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const body = await c.req.json();
  const res = await prisma.fileUploadHistory.update({
    data: {
      fileName: body.fileName,
    },
    where: {
      id: parseInt(id),
    },
  });
  return c.json(res);
});

app.notFound((c) => c.text("页面走丢了", 404)); // http://localhost:8787/other

function db(url) {
  return new PrismaClient({
    datasources: {
      db: {
        url: url,
      },
    },
  });
}

export default app;
