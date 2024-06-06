const PricingTable = () => {
  return (
    <table className="pricing-table">
      <tr className="pricing-row">
        <td className="pricing-cell">Free</td>
        <td className="pricing-cell">
          A one-minute version of the music as a sample for the client to
          evaluate whether they like it or not. The music has a watermark
          applied.
        </td>
      </tr>
      <tr className="pricing-row">
        <td className="pricing-cell">$5</td>
        <td className="pricing-cell">
          Modification of the one-minute version of the music to better suit the
          client's needs. The modification price is already included and reduced
          from the total order amount. The version of the music still with a
          watermark.
        </td>
      </tr>
      <tr className="pricing-row">
        <td className="pricing-cell">$49</td>
        <td className="pricing-cell">
          A one-minute version of the ordered music, in full quality and without
          a watermark. The product is ready to be downloaded and used. The total
          price for the unmodified version.
        </td>
      </tr>
      <tr className="pricing-row">
        <td className="pricing-cell">$39</td>
        <td className="pricing-cell">
          Extension of the track to a specific length based on the proposed
          one-minute sample. Price is for each additional minute excluding the
          first one.
        </td>
      </tr>
      <tr className="pricing-row">
        <td className="pricing-cell">$15</td>
        <td className="pricing-cell">
          Modification of the extended track (longer than one minute). The price
          is additional and does not reduce the total order amount.
        </td>
      </tr>
    </table>
  );
};

export default PricingTable;
