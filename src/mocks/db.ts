export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  } | null;
}

export const locations: Location[] = [
  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Sweet restaurant",
    robot: null,
  },
  {
    id: 3,
    name: "pepper restaurant",
    robot: {
      id: "bbh12",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "candy restaurant",
    robot: {
      id: "kjkj78",
      is_online: true,
    },
  },
  {
    id: 5,
    name: "mint restaurant",
    robot: {
      id: "yujhg56",
      is_online: true,
    },
  },
  {
    id: 6,
    name: "olive restaurant",
    robot: {
      id: "asdf890",
      is_online: true,
    },
  },
  {
    id: 7,
    name: "chocolate restaurant",
    robot: {
      id: "kkkmm6667",
      is_online: false,
    },
  },
];
