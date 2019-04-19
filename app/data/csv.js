// // Date,Open,High,Low,Close,Adj Close,Volume

// let csv_data = `2019-01-22,264.820007,265.059998,261.059998,262.859985,261.707245,115531200
// 2019-01-23,264.010010,264.790009,260.660004,263.410004,262.254852,86030300
// 2019-01-24,263.209991,264.200012,262.079987,263.549988,262.394226,59204100
// 2019-01-25,265.609985,266.700012,263.660004,265.779999,264.614441,96883400
// 2019-01-28,263.390015,263.829987,261.790009,263.760010,262.603302,85613700
// 2019-01-29,263.920013,264.549988,262.480011,263.410004,262.254852,66136300
// 2019-01-30,265.100006,268.519989,264.250000,267.579987,266.406525,92473700
// 2019-01-31,267.510010,270.470001,267.269989,269.929993,268.746246,104012100
// 2019-02-01,270.149994,271.200012,269.179993,270.059998,268.875671,85782500
// 2019-02-04,270.109985,272.029999,269.359985,271.959991,270.767334,60744800
// 2019-02-05,272.440002,273.440002,271.880005,273.100006,271.902344,79552800
// 2019-02-06,272.790009,273.339996,271.920013,272.739990,271.543915,58347800
// 2019-02-07,270.940002,271.549988,268.290009,270.140015,268.955353,95482000
// 2019-02-08,268.750000,270.579987,267.829987,270.470001,269.283875,75788900
// 2019-02-11,271.200012,271.489990,270.029999,270.619995,269.433228,68021400
// 2019-02-12,272.420013,274.519989,272.339996,274.100006,272.897980,72270200
// 2019-02-13,275.029999,275.929993,274.559998,274.989990,273.784058,65277200
// 2019-02-14,273.779999,275.640015,272.869995,274.380005,273.176727,83234400
// 2019-02-15,276.359985,277.410004,276.130005,277.369995,276.153625,97088700
// 2019-02-19,276.480011,278.579987,276.470001,277.850006,276.631531,59120800
// 2019-02-20,277.809998,278.920013,277.250000,278.410004,277.189056,76610800
// 2019-02-21,277.700012,278.100006,276.350006,277.420013,276.203400,64214700
// 2019-02-22,278.109985,279.359985,277.399994,279.140015,277.915863,78114600
// 2019-02-25,280.730011,281.309998,279.429993,279.519989,278.294189,69030700
// 2019-02-26,279.130005,280.299988,278.899994,279.320007,278.095062,56844100
// 2019-02-27,278.519989,279.589996,277.480011,279.200012,277.975616,56921600
// 2019-02-28,278.959991,279.450012,278.320007,278.679993,277.457855,69268300
// 2019-03-01,280.440002,280.880005,278.820007,280.420013,279.190247,78880500
// 2019-03-04,281.600006,281.869995,276.839996,279.399994,278.174713,106494600
// 2019-03-05,279.540009,279.760010,278.410004,279.019989,277.796387,59114600
// 2019-03-06,279.149994,279.160004,276.970001,277.329987,276.113770,75039800
// 2019-03-07,276.829987,276.989990,274.070007,275.010010,273.803986,94710600
// 2019-03-08,272.940002,274.649994,272.420013,274.459991,273.256378,85795800
// 2019-03-11,275.260010,278.619995,275.230011,278.440002,277.218933,65098900
// 2019-03-12,279.059998,280.070007,278.850006,279.489990,278.264313,79667500
// 2019-03-13,280.480011,282.380005,280.299988,281.339996,280.106201,80639200
// 2019-03-14,281.369995,281.839996,280.670013,281.160004,279.927002,67518400
// 2019-03-15,280.540009,282.209991,280.329987,281.309998,281.309998,81309000
// 2019-03-18,281.549988,282.660004,281.299988,282.329987,282.329987,62199800
// 2019-03-19,283.510010,284.359985,281.410004,282.399994,282.399994,90268100
// 2019-03-20,282.160004,283.500000,280.320007,281.549988,281.549988,84609200
// 2019-03-21,280.640015,285.179993,280.589996,284.730011,284.730011,79550400
// 2019-03-22,283.220001,283.799988,279.179993,279.250000,279.250000,122659300
// 2019-03-25,278.869995,280.190002,277.640015,279.040009,279.040009,85575200
// 2019-03-26,280.989990,282.179993,279.559998,281.119995,281.119995,68125900
// 2019-03-27,281.109985,281.760010,277.929993,279.649994,279.649994,72224700
// 2019-03-28,280.350006,281.209991,279.070007,280.709991,280.709991,56238500
// 2019-03-29,282.390015,282.839996,281.140015,282.480011,282.480011,82186800
// 2019-04-01,284.700012,286.160004,284.399994,285.829987,285.829987,77617900
// 2019-04-02,286.040009,286.230011,285.089996,285.970001,285.970001,40070400
// 2019-04-03,287.320007,287.760010,285.750000,286.420013,286.420013,68243200
// 2019-04-04,286.779999,287.459991,286.010010,287.179993,287.179993,48997500
// 2019-04-05,287.920013,288.630005,287.600006,288.570007,288.570007,58621700
// 2019-04-08,288.100006,288.910004,287.369995,288.790009,288.790009,53566300
// 2019-04-09,287.720001,288.079987,286.700012,287.309998,287.309998,66142300
// 2019-04-10,287.769989,288.390015,287.309998,288.290009,288.290009,52601500
// 2019-04-11,288.829987,288.839996,287.579987,288.209991,288.209991,55093100
// 2019-04-12,290.000000,290.470001,288.260010,290.160004,290.160004,69727800`

// TESLA 1 MONTH DATA
let csv_data = `2019-03-19,267.500000,273.299988,263.459991,267.470001,267.470001,11800600
2019-03-20,269.690002,274.970001,266.299988,273.600006,273.600006,6908200
2019-03-21,272.600006,276.450012,268.450012,274.019989,274.019989,5947100
2019-03-22,272.579987,272.799988,264.000000,264.529999,264.529999,8745600
2019-03-25,259.709991,263.179993,254.460007,260.420013,260.420013,10215000
2019-03-26,264.440002,270.260010,264.429993,267.769989,267.769989,7350900
2019-03-27,268.750000,275.369995,268.179993,274.829987,274.829987,8779200
2019-03-28,277.160004,280.329987,275.100006,278.619995,278.619995,6774100
2019-03-29,278.700012,280.160004,274.500000,279.859985,279.859985,5991300
2019-04-01,282.619995,289.200012,281.279999,289.179993,289.179993,8110400
2019-04-02,288.299988,289.440002,283.880005,285.880005,285.880005,5478900
2019-04-03,287.320007,296.170013,287.170013,291.809998,291.809998,7929900
2019-04-04,261.890015,271.200012,260.589996,267.779999,267.779999,23720700
2019-04-05,269.859985,276.100006,266.109985,274.959991,274.959991,13038300
2019-04-08,277.690002,281.160004,270.440002,273.200012,273.200012,10410400
2019-04-09,271.649994,275.000000,269.609985,272.309998,272.309998,5904000
2019-04-10,276.739990,278.380005,272.890015,276.059998,276.059998,7061300
2019-04-11,268.299988,270.500000,265.600006,268.420013,268.420013,9835900
2019-04-12,270.220001,271.950012,266.829987,267.700012,267.700012,6746000
2019-04-15,268.630005,268.880005,258.630005,266.380005,266.380005,10038600
2019-04-16,265.750000,275.000000,264.720001,273.359985,273.359985,7272900
2019-04-17,274.750000,274.790009,268.540009,271.230011,271.230011,5126500
2019-04-18,271.230011,274.839996,269.750000,273.260010,273.260010,5876300`