<?php
header('Content-Type: text/html; charset=utf-8');
$data=array(
	'form_header'=>isset($_POST['form_header']) ? $_POST['form_header'] : '',
	'name'=>isset($_POST['name']) ? $_POST['name'] : '',
	'phone'=>isset($_POST['phone']) ? (int) $_POST['phone'] : '',
	'email'=>isset($_POST['email']) ? $_POST['email'] : '',
	'utn_source'=>isset($_POST['utn_source']) ? $_POST['utn_source'] : '',
	'utm_term'=>isset($_POST['utm_term']) ? $_POST['utm_term'] : ''
);
switch ($data['form_header']) {
	case 'callback':
		$message = "
			<tr>
				<th>Обратный звонок</th>
			</tr>
			<tr style='background-color: #f8f8f8;'>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[name]</td>
			</tr>
			<tr>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[phone]</td>
			</tr>
		";
		break;
	case 'proposal':
		$message = "
			<tr>
				<th>Предложение на почту</th>
			</tr>
			<tr style='background-color: #f8f8f8;'>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[name]</td>
			</tr>
			<tr>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>E-mail</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$data[email]</td>
			</tr>
		";

		break;
	case 'brief':
		$message = "
			<h4>Бриф</h4>
			<ol>
				$_POST[brief]
			</ol>
			<p><b>Имя:</b> $data[name]</p>
			<p><b>Телефон:</b> $data[phone]</p>
		";

		break;
	case 'calc':
		$message = "
			<tr>
				<td><b>Имя:</b> $data[name]</td>
				<td><b>Телефон:</b> $data[phone]</td>
				<td><b>E-mail:</b> $data[email]</td>
			</tr><hr>".$_POST['total']."<hr><tr><td><b>Итого:</b> $_POST[price] руб</td><td>$_POST[day] дней</td></tr>";

		break;
	case 'coupon':
		$message = "
			<h4>Отправить скидочный купон</h4>
			<p><b>E-mail:</b> $data[email]</p>
		";

		break;
	
	default:
		die('fail');
		break;
}

$project_name = 'Заявка с сайта hetz1.ru';
$admin_email  = 'alexlazydev@gmail.com';
$form_subject = $data['form_header'];

$message = "
<p><b>Источник:</b> $data[utn_source]</p>
<p><b>Фраза:</b> $data[utm_term]</p>
<table style='text-align:left'>$message</table>
";

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