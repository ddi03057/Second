import { atom, useAtom } from "jotai";

function store() {
  const alertAtom = atom({ open: false, title: "", message: "", isHeader: false, confirmBtn: [], callback: () =>{ }, curRef: "!@#" });
}
export default store;