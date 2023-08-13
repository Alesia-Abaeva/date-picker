interface DateCellItem {
  date: number;
  month: number;
  year: number;
  type: "prev" | "next" | "current";

  //
  isToday?: boolean;
  isSelected?: boolean;
}
