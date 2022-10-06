// Generate some test events

// model JamSession {
//   id        Int      @id @default(autoincrement())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   name      String
//   date      DateTime
//   location  String
//   time      String
//   organizer User     @relation(fields: [organizerId], references: [id])
//   organizerId Int
//   openingBand String
//   type      String
//   description String?
//   image     String?
// }

export const jamSessions = [
  {
    name: 'Jam Session 1',
    date: new Date(),
    location: 'Location 1',
    time: '12:00',
    organizerId: 1,
    openingBand: 'Opening Band 1',
    type: 'Type 1',
    description: 'Description 1',
    image: 'Image 1', 
  },
  { 
    name: 'Jam Session 2',
    date: new Date().getDate() + 1,
    location: 'Location 2',
    time: '12:00',
    organizerId: 1,
    openingBand: 'Opening Band 2',
    type: 'Type 2',
    description: 'Description 2',
    image: 'Image 2',
  },
  {
    name: 'Jam Session 3',
    date: new Date().getDate() + 2,
    location: 'Location 3',
    time: '12:00',
    organizerId: 1,
    openingBand: 'Opening Band 3',
    type: 'Type 3',
    description: 'Description 3',
    image: 'Image 3',
  },
  {
    name: 'Jam Session 4',
    date: new Date().getDate() - 3,
    location: 'Location 4',
    time: '12:00',
    organizerId: 1,
    openingBand: 'Opening Band 4',
    type: 'Type 4',
    description: 'Description 4',
    image: 'Image 4',
  },
];