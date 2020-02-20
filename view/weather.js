const template = require('./template');
const header = template.header();

module.exports.weather = function(navBar, menuLink, result) {
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
                    <div class="col-12"><h3>현재 날씨</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-1"></div>
                    <div class="col-6">
                        <table class="table table-condensed table-hover">
                            <thead class="thead-light">
                                <tr class="active">
                                    <th>항목</th>
                                    <th style="text-align: center;">내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>도시명:</td><td align="center">${result.name}</td></tr>
                                <tr><td>경도:</td><td align="center">${result.coord.lon}&deg;</td></tr>
                                <tr><td>위도:</td><td align="center">${result.coord.lat}&deg;</td></tr>
                                <tr><td>기온:</td><td align="center">${result.main.temp}&#8451;</td></tr>
                                <tr><td>체감온도:</td><td align="center">${result.main.feels_like}&#8451;</td></tr>
                                <tr><td>최저기온:</td><td align="center">${result.main.temp_min}&#8451;</td></tr>
                                <tr><td>최고기온:</td><td align="center">${result.main.temp_max}&#8451;</td></tr>
                                <tr><td>습도:</td><td align="center">${result.main.humidity}%</td></tr>
                                <tr><td>풍속:</td><td align="center">${result.wind.speed}m/sec</td></tr>
                                <tr><td rowspan="2">풍향:</td><td align="center">${result.wind.deg}&deg;</td></tr>
                                <tr><td align="center">(정북: 0, 정동: 90, 정남: 180, 정서: 270)</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-5"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}