import React from "react";
import { Link } from "react-router-dom";
import "./Calculator.css";
import calculators from "../data/Calculatorlist";

// const calculators = [
//   { img: "/calculator/craiyon_173320_A_tree_full_of_money_and_crypto_currency__and_in_the_background_a_wall_full_of_many_blue.png", name: "SIP Growth Calculator", link: "/Calculator/Sip" },
//   { img: "/calculator/craiyon_173348_Bribe_Money_inside_a_paper_bag_blue.png", name: "LUMPSUM Growth Calculator", link: "/Calculator/lumpsum" },
//   { img: "/calculator/craiyon_173410_complex_machine_that_prints_money__spitting_out_a_ton_of_100_dollar_bills__styled_in_pink.png", name: "SIP TOP UP Growth Calculator", link: "/Calculator/topup" },
//   { img: "/calculator/craiyon_173453_Visualize_business_growth_through_a_series_of_ascending_steps_with_charts_and_coins__multicolor.png", name: "Asset Future Value Calculator", link: "/Calculator/asset" },
//   { img: "/calculator/craiyon_173320_A_tree_full_of_money_and_crypto_currency__and_in_the_background_a_wall_full_of_many_blue.png", name: "Time Duration Calculator - One Time Investment", link: "/Calculator/onetime" },
//   { img: "/calculator/final_craiyon_173436_money_walking-removebg-preview.png", name: "Time Duration Calculator - Regular Investment", link: "/Calculator/regular" }
// ];

export default function Calculator() {
  return (
    <div>
      <h2>Choose a Calculator</h2>
      <div className="container">
        {/* ✅ Loop through the array using map() */}
        {calculators.map((calc, index) => (
          <div className="image-grid" key={index}>
            <img src={calc.img} alt={calc.name} />
            <div className="middle">
              <Link to={calc.link}>
                <button>{calc.name}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
