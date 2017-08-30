<?php
header('Content-Type: text/html; charset=utf-8');
$data=array(
	'header'=>isset($_POST['header']) ? $_POST['header'] : '',
	'name'=>isset($_POST['name']) ? $_POST['name'] : '',
	'phone'=>isset($_POST['phone']) ? $_POST['phone'] : '',
	'msg'=>isset($_POST['msg']) ? $_POST['msg'] : ''
);
if($data[msg] != '' && $data[name] != '' && $data[phone] != ''){
	$message = "
		<h4>$data[header]</h4>
		<p><b>Имя:</b> $data[name]</p>
		<p><b>Телефон:</b> $data[phone]</p>
		<p><b>Отзыв:</b> $data[msg]</p>
	";
}elseif($data[name] != '' && $data[phone] != '') {
	$message = "
		<h4>$data[header]</h4>
		<p><b>Имя:</b> $data[name]</p>
		<p><b>Телефон:</b> $data[phone]</p>
	";
}


$project_name = 'Заявка с сайта МСК-регион';
$admin_email  = 'info@region-msk.ru';
$form_subject = $data['header'];

$eol = "\n";
$boundary = md5(uniqid(time()));
$header  = 'From: '.$admin_email.$eol;
$header .= 'Reply-To: '.$admin_email.$eol;
$header .= 'MIME-Version: 1.0'.$eol;
$header .= 'Content-Type: multipart/mixed; boundary="'.$boundary.'"'.$eol;
$header .= 'X-Mailer: PHP v'.phpversion().$eol;
// $header .= 'Bcc: alexlazydev@gmail.com';

$body  = 'This is a multi-part message in MIME format.'.$eol.$eol;
$body .= '--'.$boundary.$eol;
$body .= 'Content-Type: text/html; charset=UTF-8'.$eol;
$body .= 'Content-Transfer-Encoding: 8bit'.$eol;
$body .= $eol.stripslashes($message).$eol;
$body .= '--'.$boundary.'--'.$eol;

mail($admin_email, $form_subject, $body, $header);
echo('success');
