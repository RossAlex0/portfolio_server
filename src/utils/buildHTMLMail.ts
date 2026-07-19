export const generateWeeklySummaryHTML = (
  perDay: Record<string, number>,
  total: number,
  domainName: string
) => {
  const rows = Object.entries(perDay)
    .map(
      ([day, count]) =>
        `<tr>
          <td style="padding: 4px 8px; border: 1px solid #ddd;">${
            day.charAt(0).toUpperCase() + day.slice(1)
          }</td>
          <td style="padding: 4px 8px; border: 1px solid #ddd; text-align: center;">${count}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.4;">
      <h2 style="text-align: center; color: #2c3e50;">Résumé hebdomadaire des visites sur le site web ${domainName} :</h2>
      <p>Voici le nombre de visites par jour sur le site :</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 400px; margin: 0 auto;">
        <thead>
          <tr>
            <th style="padding: 6px 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Jour</th>
            <th style="padding: 6px 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Vues</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding: 6px 8px; border: 1px solid #ddd; font-weight: bold;">Total</td>
            <td style="padding: 6px 8px; border: 1px solid #ddd; text-align: center; font-weight: bold;">${total}</td>
          </tr>
        </tfoot>
      </table>
      <p style="text-align: center; margin-top: 20px;">Cordialement,<br>Alex.R</p>
    </div>
  `;
};
