interface Sub {
  name: string;
  date: number;
  price: string;
  twoDayId: string;
  sevenDayId: string;
}

type Subs = firebase.firestore.DocumentData | null | undefined;
