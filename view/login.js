const template = require('./template');
const header = template.header();

module.exports.login = function() {
	return `
<!DOCTYPE html>
<html lang="ko">
<head>
	${header}
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<div class="jumbotron">
					<a href="/"><img src="/greenlogo.png"></a>
					<p><h2>로그인</h2></p>
					<p><h5>강남 스마트팜 시스템을 이용하려면 로그인을 해주세요.</h5></p>
				</div><br><br>
				<form action="/user/login" class="form-horizontal" method="POST">
					<div class="form-group row">
						<div class="col-3"></div>
						<label for="uid" class="col-2 col-form-label">아이디</label>
						<div class="col-3">
							<input type="text" class="form-control" id="uid" name="uid">
						</div>
						<div class="col-4"></div>
					</div>
					<div class="form-group row">
						<div class="col-3"></div>
						<label for="password" class="col-2 col-form-label">패스워드</label>
						<div class="col-3">
							<input type="password" class="form-control" id="password" name="password">
						</div>
						<div class="col-4"></div>
					</div>
					<br>
					<div class="form-group row">
						<div class="col-4"></div>
						<div class="col-8">
							<input class="btn btn-primary" type="submit" value="로그인">&nbsp;&nbsp;&nbsp;
							<button class="btn btn-secondary" type="reset" type="button">취소</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-1"></div>
		</div>
	</div>
</body>
</html>
	`;
}