<?php
$data=array(
	'form_header'=>isset($_POST['form_header']) ? $_POST['form_header'] : '',
	'name'=>isset($_POST['name']) ? $_POST['name'] : 'ss',
	'phone'=>isset($_POST['phone']) ? $_POST['phone'] : '',
	'msg'=>isset($_POST['msg']) ? $_POST['msg'] : '',
	'email'=>isset($_POST['email']) ? $_POST['email'] : 'sd'
);

if(empty($data['name']))
  die('Не заполнено имя контакта');
if(empty($data['phone']))
  die('Не заполнен лелефон контакта');
if(empty($data['email']))
  die('Не заполнен E-mail контакта');

$project_name = 'Подарки';
$admin_email  = 'bp-present2017@yandex.ru';
$form_subject = 'Заявка с сайта bp-present.ru';

$name = $data['name'];
$message = "
	<tr style='background-color: #f8f8f8;'>
		<td style='width: 30%;padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
		<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[name]</td>
	</tr>
	<tr>
		<td style='width: 30%;padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон</b></td>
		<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[phone]</td>
	</tr>
	<tr style='background-color: #f8f8f8;'>
		<td style='width: 30%;padding: 10px; border: #e9e9e9 1px solid;'><b>Почта</b></td>
		<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[email]</td>
	</tr>
	<tr>
		<td style='width: 30%;padding: 10px; border: #e9e9e9 1px solid;'><b>Сообщение</b></td>
		<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[msg]</td>
	</tr>
";

$message = "<table style='width: 100%;'>$message</table>";

$eol = "\n";
$boundary = md5(uniqid(time()));
$header  = 'From: '.$admin_email.$eol;
$header .= 'Reply-To: '.$admin_email.$eol;
$header .= 'MIME-Version: 1.0'.$eol;
$header .= 'Content-Type: multipart/mixed; boundary="'.$boundary.'"'.$eol;
$header .= 'X-Mailer: PHP v'.phpversion().$eol;
$header .= 'Bcc: kmaleyko@ya.ru'; 

$body  = 'This is a multi-part message in MIME format.'.$eol.$eol;
$body .= '--'.$boundary.$eol;
$body .= 'Content-Type: text/html; charset=UTF-8'.$eol;
$body .= 'Content-Transfer-Encoding: 8bit'.$eol;
$body .= $eol.stripslashes($message).$eol;
$body .= '--'.$boundary.'--'.$eol;

mail($admin_email, $form_subject, $body, $header);
