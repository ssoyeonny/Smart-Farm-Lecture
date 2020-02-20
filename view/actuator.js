const template = require('./template');
const header = template.header();

module.exports.actuator = function(navBar, menuLink, actuator) {
    let curR = actuator.redLED;
    let curG = actuator.greenLED;
    let curB = actuator.blueLED;
    let relay = actuator.relay;
    let aTime = actuator.aTime;
    let reason = actuator.reason;
    let aUid = actuator.uid;

    let radio = '';
    if (relay == 0) 
        radio = `<input type="radio" name="relay" value="0" checked>&nbsp;OFF&nbsp;&nbsp;&nbsp;&nbsp;
                 <input type="radio" name="relay" value="1">&nbsp;ON<br>`;
    else
        radio = `<input type="radio" name="relay" value="0">&nbsp;OFF&nbsp;&nbsp;&nbsp;&nbsp;
                 <input type="radio" name="relay" value="1" checked>&nbsp;ON<br>`;
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
                <div class="col-12"><h3>액츄에이터 구동</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h5>최근 구동시각: ${aTime}</h5>
                    <form action="/actuator" method="POST">
                    <table class="table">
                        <tr><td rowspan="2" style="text-align: center;">Red LED</td><td>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${curR/255*100}%" aria-valuemin="0" aria-valuemax="255">${curR}</div>
                            </div></td></tr>
                        <tr><td>
                            <input type="range" class="form-control-range" name="redRange" min="0" max="255" step="1" value="${curR}">
                            </td></tr>
                        <tr><td rowspan="2" style="text-align: center;">Green LED</td><td>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${curG/255*100}%" aria-valuemin="0" aria-valuemax="255">${curG}</div>
                            </div></td></tr>
                        <tr><td>
                            <input type="range" class="form-control-range" name="greenRange" min="0" max="255" step="1" value="${curG}">
                            </td></tr>
                        <tr><td rowspan="2" style="text-align: center;">Blue LED</td><td>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${curB/255*100}%" aria-valuemin="0" aria-valuemax="255">${curB}</div>
                            </div></td></tr>
                        <tr><td>
                            <input type="range" class="form-control-range" name="blueRange" min="0" max="255" step="1" value="${curB}">
                            </td></tr>
                        <tr><td style="text-align: center;">Relay</td>
                            <td style="text-align: center;">
                                <div class="form-check form-check-inline">${radio}</div>
                            </td></tr>
                        <tr><td style="text-align: center;">변경 사유</td>
                            <td style="text-align: center;">
                                <select class="form-control" name="reason">
                                    <option value="Periodical" selected>정기적</option>
                                    <option value="Temporary">임시적</option>
                                </select>
                            </td></tr>
                        <tr><td colspan="2" style="text-align: center;"><button type="submit" class="btn btn-primary">작동</button></td></tr>
                    </table>
                    </form>
                </div>
                <div class="col-1"></div><br>
                </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}