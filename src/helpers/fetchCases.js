export const fetchCases = async () => {
  const DataFrame = await import("dataframe-js").then(mod => mod.DataFrame)

  const df = await DataFrame.fromCSV(
    "https://covid.ourworldindata.org/data/owid-covid-data.csv"
  )

  console.log(df)
  const filtered = df.filter(row => row.get("iso_code") === "CHL")

  const lastUpdate = filtered.select("date").toArray().slice(-1)
  const cases = filtered.select("new_cases").toArray()

  return [cases, lastUpdate]
}
