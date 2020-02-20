const template = require('./template');
const header = template.header();
const TEMP_LOW = 18.0;
const TEMP_HIGH = 20.0;
const HUMID_LOW = 20.0;
const HUMID_HIGH = 28.0;
const CDS_LOW = 65.0;
const CDS_HIGH = 90.0;
const DIST_LOW = 10.0;
const DIST_HIGH = 30.0
const ok = `<span style="color:green"><i class="far fa-thumbs-up"></i></span>`;
const up = `<span style="color:red"><i class="fas fa-arrow-up"></i></span>`;
const down = `<span style="color:blue"><i class="fas fa-arrow-down"></i></span>`;

module.exports.sensor = function(navBar, menuLink, sensor) {
    let temp = sensor.temperature;
    let humid = sensor.humidity;
    let cds = sensor.cds;
    let dist = sensor.distance;
    let sTime = sensor.sTime;
    let sUid = sensor.uid;

    let tempSign, humidSign, cdsSign, distSign;
    if (temp > TEMP_HIGH) tempSign = up;
    else if (temp < TEMP_LOW) tempSign = down;
    else tempSign = ok;
    if (humid > HUMID_HIGH) humidSign = up;
    else if (humid < HUMID_LOW) humidSign = down;
    else humidSign = ok;
    if (cds > CDS_HIGH) cdsSign = up;
    else if (cds < CDS_LOW) cdsSign = down;
    else cdsSign = ok;
    if (dist > DIST_HIGH) distSign = up;
    else if (dist < DIST_LOW) distSign = down;
    else distSign = ok;

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
	${header}
</head>
<body>
<div class="container">
    ${navBar}
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>센서 조회</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h5>측정 시각: ${sTime}</h5>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th scope="col">항목</th><th scope="col">기준</th>
                            <th scope="col">현재값</th><th scope="col">단위</th>
                            <th scope="col">상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td><i class="fas fa-thermometer-half"></i>&nbsp;&nbsp;온도</td>
                                <td>${TEMP_LOW} ~ ${TEMP_HIGH}</td>
                                <td>${temp}</td><td>℃</td><td>${tempSign}</td>
                            </tr>
                            <tr>
                                <td><i class="fas fa-tint"></i>&nbsp;&nbsp;습도</td>
                                <td>${HUMID_LOW} ~ ${HUMID_HIGH}</td>
                                <td>${humid}</td><td>%</td><td>${humidSign}</td>
                            </tr>
                            <tr>
                                <td><i class="far fa-lightbulb"></i>&nbsp;&nbsp;조도</td>
                                <td>${CDS_LOW} ~ ${CDS_HIGH}</td>
                                <td>${cds}</td><td>lux</td><td>${cdsSign}</td>
                            </tr>
                            <tr>
                                <td><i class="fas fa-ruler-vertical"></i>&nbsp;&nbsp;거리</td>
                                <td>${DIST_LOW} ~ ${DIST_HIGH}</td>
                                <td>${dist}</td><td>cm</td><td>${distSign}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}