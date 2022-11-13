export type CompactJamSession = {
  name: string;
  date: Date; 
  location: string;
  time: string;
  openingBand: string;
  type: string;
  description: string;
  image: string;
};

export type JamSession = {
  name: string;
  date: Date;
  location: string;
  time: string;
  organizer: User;
  openingBand: string;
  type: string;
  description: string;
  image: string;
  public: boolean;
}

export type User = {
  // id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  savedJams: JamSession[];
}

export type Role = 'USER' | 'ORGANIZER' |'ADMIN';
