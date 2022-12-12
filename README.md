# 下载相关依赖
```bash
npm init -y
npm install typescript ts-node @types/node --save-dev
touch tsconfig.json
```

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

# 数据源
```
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
```

# 添加schema
```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

# 创建修改
```
npx prisma migrate dev --name init
```

# 创建Client
```javascript
// touch script.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

# 创建数据

``` typescript
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)
```
# 运行
```
npx ts-node script.ts
```

# 查询数据
```javascript
  const users = await prisma.user.findMany()
  console.log(users)
```

# 创建User & Post
```typescript
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
        },
      },
    },
  })
  console.log(user)
```


# 关联查询
```typescript
const usersWithPosts = await prisma.user.findMany({
        include: {
        posts: true,
        },
    })
  console.dir(usersWithPosts, { depth: null })
```