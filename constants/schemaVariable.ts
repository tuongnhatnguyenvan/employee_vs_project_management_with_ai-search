const OUR_SCHEMA = `
enum ProjectType {
  SHORT_TERM
  LONG_TERM
}

enum EmployeeRole {
  DEVELOPER
  TEAM_LEAD
  PROJECT_MANAGER
  QA
  DESIGNER
}

model Employees {
  id          String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String       @db.VarChar(255)
  age         Int?
  email       String       @unique @db.VarChar(255)
  avatar      String?      @db.Text
  role        EmployeeRole @default(DEVELOPER)
  joiningDate DateTime     @default(now())
  isActive    Boolean      @default(true)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  employeeSkills   EmployeeSkills[]
  employeeProjects EmployeeProjects[]
}

model Skills {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String   @db.VarChar(100)
  description String?  @db.Text
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  employeeSkills EmployeeSkills[]
  ProjectSkills  ProjectSkills[]
}

model EmployeeSkills {
  id          String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  employeeId  String @db.Uuid
  skillId     String @db.Uuid
  proficiency Int?

  employee Employees @relation(fields: [employeeId], references: [id])
  skill    Skills    @relation(fields: [skillId], references: [id])
}

model Projects {
  id          String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String      @db.VarChar(255)
  description String?     @db.Text
  domainId    String      @db.Uuid
  type        ProjectType @default(SHORT_TERM)
  isActive    Boolean     @default(true)
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  domain           Domain             @relation(fields: [domainId], references: [id])
  phases           Phase[]
  EmployeeProjects EmployeeProjects[]
  ProjectSkills    ProjectSkills[]
}

model ProjectSkills {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  skillId     String   @db.Uuid
  projectId   String   @db.Uuid
  proficiency Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  projects    Projects @relation(fields: [projectId], references: [id])
  skills      Skills   @relation(fields: [skillId], references: [id])
}

model Phase {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String   @db.VarChar(100)
  projectId   String   @db.Uuid
  isFinished  Boolean  @default(false)
  description String?  @db.Text
  startDate   DateTime
  endDate     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  project          Projects           @relation(fields: [projectId], references: [id])
  employeeProjects EmployeeProjects[]
}

model Domain {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String   @db.VarChar(100)
  description String?  @db.Text
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  projects Projects[]
}

model EmployeeProjects {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  employeeId String   @db.Uuid
  projectId  String   @db.Uuid
  phaseId    String   @db.Uuid
  action     String
  timestamp  DateTime
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  employee Employees @relation(fields: [employeeId], references: [id])
  project  Projects  @relation(fields: [projectId], references: [id])
  phase    Phase     @relation(fields: [phaseId], references: [id])
}`;

export default OUR_SCHEMA;
