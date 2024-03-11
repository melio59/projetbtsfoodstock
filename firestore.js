import {app} from "./firebase"
import { getFirestore, collection, getDocs  } from "firebase/firestore";

const db = getFirestore(app);

const EleveCollection = await getDocs(collection(db, "Eleve"));

export {EleveCollection}