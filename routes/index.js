"use strict";
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const template = "<!DOCTYPE html><html xmlns=http://www.w3.org/1999/xhtml><head><!--[if gte mso 15]> <xml> <o:officedocumentsettings> <o:allowpng> <o:pixelsperinch>96</o:pixelsperinch> </o:officedocumentsettings> </xml><![endif]--> <meta charset=UTF-8> <meta content=\"IE=edge\" http-equiv=X-UA-Compatible> <meta content=\"width=device-width,initial-scale=1\" name=viewport> <title>*|MC:SUBJECT|*</title> <style>p{margin: 10px 0; padding: 0}table{border-collapse: collapse}h1, h2, h3, h4, h5, h6{display: block; margin: 0; padding: 0}a img, img{border: 0; height: auto; outline: 0; text-decoration: none}#bodyCell, #bodyTable, body{height: 100%; margin: 0; padding: 0; width: 100%}.mcnPreviewText{display: none !important}#outlook a{padding: 0}img{-ms-interpolation-mode: bicubic}table{mso-table-lspace: 0; mso-table-rspace: 0}.ReadMsgBody{width: 100%}.ExternalClass{width: 100%}a, blockquote, li, p, td{mso-line-height-rule: exactly}a[href^=sms], a[href^=tel]{color: inherit; cursor: default; text-decoration: none}a, blockquote, body, li, p, table, td{-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%}.ExternalClass, .ExternalClass div, .ExternalClass font, .ExternalClass p, .ExternalClass span, .ExternalClass td{line-height: 100%}a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important}.templateContainer{max-width: 600px !important}a.mcnButton{display: block}.mcnImage{vertical-align: bottom}.mcnTextContent{word-break: break-word}.mcnTextContent img{height: auto !important}.mcnDividerBlock{table-layout: fixed !important}h1{color: #222; font-family: Helvetica; font-size: 40px; font-style: normal; font-weight: 700; line-height: 150%; letter-spacing: normal; text-align: center}h2{color: #222; font-family: Helvetica; font-size: 34px; font-style: normal; font-weight: 700; line-height: 150%; letter-spacing: normal; text-align: left}h3{color: #444; font-family: Helvetica; font-size: 22px; font-style: normal; font-weight: 700; line-height: 150%; letter-spacing: normal; text-align: left}h4{color: #999; font-family: Georgia; font-size: 20px; font-style: italic; font-weight: 400; line-height: 125%; letter-spacing: normal; text-align: left}#templateHeader{background-color: #fff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0}.headerContainer{background-color: #transparent; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0}.headerContainer .mcnTextContent, .headerContainer .mcnTextContent p{color: grey; font-family: Helvetica; font-size: 16px; line-height: 150%; text-align: left}.headerContainer .mcnTextContent a, .headerContainer .mcnTextContent p a{color: #00add8; font-weight: 400; text-decoration: underline}#templateBody{background-color: #fff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0}.bodyContainer{background-color: transparent; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0}.bodyContainer .mcnTextContent, .bodyContainer .mcnTextContent p{color: grey; font-family: Helvetica; font-size: 16px; line-height: 150%; text-align: left}.bodyContainer .mcnTextContent a, .bodyContainer .mcnTextContent p a{color: #00add8; font-weight: 400; text-decoration: underline}#templateFooter{background-color: #fff; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 2px; padding-bottom: 2px}.footerContainer{background-color: #transparent; background-image: none; background-repeat: no-repeat; background-position: center; background-size: cover; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0}.footerContainer .mcnTextContent, .footerContainer .mcnTextContent p{color: #fff; font-family: Helvetica; font-size: 12px; line-height: 150%; text-align: center}.footerContainer .mcnTextContent a, .footerContainer .mcnTextContent p a{color: #fff; font-weight: 400; text-decoration: underline}@media only screen and (min-width: 768px){.templateContainer{width: 600px !important}}@media only screen and (max-width: 480px){a, blockquote, body, li, p, table, td{-webkit-text-size-adjust: none !important}}@media only screen and (max-width: 480px){body{width: 100% !important; min-width: 100% !important}}@media only screen and (max-width: 480px){.mcnImage{width: 100% !important}}@media only screen and (max-width: 480px){.mcnBoxedTextContentContainer, .mcnCaptionBottomContent, .mcnCaptionLeftImageContentContainer, .mcnCaptionLeftTextContentContainer, .mcnCaptionRightImageContentContainer, .mcnCaptionRightTextContentContainer, .mcnCaptionTopContent, .mcnCartContainer, .mcnImageCardLeftTextContentContainer, .mcnImageCardRightTextContentContainer, .mcnImageGroupContentContainer, .mcnRecContentContainer, .mcnTextContentContainer{max-width: 100% !important; width: 100% !important}}@media only screen and (max-width: 480px){.mcnBoxedTextContentContainer{min-width: 100% !important}}@media only screen and (max-width: 480px){.mcnImageGroupContent{padding: 9px !important}}@media only screen and (max-width: 480px){.mcnCaptionLeftContentOuter .mcnTextContent, .mcnCaptionRightContentOuter .mcnTextContent{padding-top: 9px !important}}@media only screen and (max-width: 480px){.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent, .mcnImageCardTopImageContent{padding-top: 18px !important}}@media only screen and (max-width: 480px){.mcnImageCardBottomImageContent{padding-bottom: 9px !important}}@media only screen and (max-width: 480px){.mcnImageGroupBlockInner{padding-top: 0 !important; padding-bottom: 0 !important}}@media only screen and (max-width: 480px){.mcnImageGroupBlockOuter{padding-top: 9px !important; padding-bottom: 9px !important}}@media only screen and (max-width: 480px){.mcnBoxedTextContentColumn, .mcnTextContent{padding-right: 18px !important; padding-left: 18px !important}}@media only screen and (max-width: 480px){.mcnImageCardLeftImageContent, .mcnImageCardRightImageContent{padding-right: 18px !important; padding-bottom: 0 !important; padding-left: 18px !important}}@media only screen and (max-width: 480px){.mcpreview-image-uploader{display: none !important; width: 100% !important}}@media only screen and (max-width: 480px){h1{font-size: 30px !important; line-height: 125% !important}}@media only screen and (max-width: 480px){h2{font-size: 26px !important; line-height: 125% !important}}@media only screen and (max-width: 480px){h3{font-size: 20px !important; line-height: 150% !important}}@media only screen and (max-width: 480px){h4{font-size: 18px !important; line-height: 150% !important}}@media only screen and (max-width: 480px){.mcnBoxedTextContentContainer .mcnTextContent, .mcnBoxedTextContentContainer .mcnTextContent p{font-size: 14px !important; line-height: 150% !important}}@media only screen and (max-width: 480px){.headerContainer .mcnTextContent, .headerContainer .mcnTextContent p{font-size: 16px !important; line-height: 150% !important}}@media only screen and (max-width: 480px){.bodyContainer .mcnTextContent, .bodyContainer .mcnTextContent p{font-size: 16px !important; line-height: 150% !important}}@media only screen and (max-width: 480px){.footerContainer .mcnTextContent, .footerContainer .mcnTextContent p{font-size: 14px !important; line-height: 150% !important}}</style><body><span style=display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;visibility:hidden;mso-hide:all class=mcnPreviewText>*|MC_PREVIEW_TEXT|*</span><center> <table border=0 cellpadding=0 cellspacing=0 width=100% align=center height=100% id=bodyTable> <tr> <td valign=top align=center id=bodyCell> <table border=0 cellpadding=0 cellspacing=0 width=100%> <tr> <td valign=top align=center id=templateHeader data-template-container><!--[if gte mso 9]> <table border=0 cellpadding=0 cellspacing=0 width=600 align=center style=width:600px> <tr> <td valign=top style=width:600px align=center width=600><![endif]--> <table border=0 cellpadding=0 cellspacing=0 width=100% class=templateContainer align=center> <tr> <td valign=top class=headerContainer> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageBlock style=min-width:100%> <tbody class=mcnImageBlockOuter> <tr> <td valign=top class=mcnImageBlockInner style=padding:9px> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageContentContainer style=min-width:100% align=left> <tr> <td valign=top class=mcnImageContent style=padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0> <a href=https://www.payjo.co/ target=_blank><img src=https://gallery.mailchimp.com/ee15f04e2a9116990097f3af5/images/14011095-690b-4c17-96dd-9f3ac311cf61.png style=max-width:212px;padding-bottom:0;display:inline!important;vertical-align:bottom width=106 align=left alt=\"\" class=mcnImage></a> </table> </table> </table> <tr> <td valign=top align=center id=templateBody data-template-container><!--[if gte mso 9]> <table border=0 cellpadding=0 cellspacing=0 width=600 align=center style=width:600px> <tr> <td valign=top style=width:600px align=center width=600><![endif]--> <table border=0 cellpadding=0 cellspacing=0 width=100% class=templateContainer align=center> <tr> <td valign=top class=bodyContainer> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageBlock style=min-width:100%> <tbody class=mcnImageBlockOuter> <tr> <td valign=top class=mcnImageBlockInner style=padding:9px> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageContentContainer style=min-width:100% align=left> <tr> <td valign=top class=mcnImageContent style=padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center> </table> </table> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%> <tbody class=mcnTextBlockOuter> <tr> <td valign=top class=mcnTextBlockInner style=padding-top:0px><!--[if mso]> <table border=0 cellpadding=0 cellspacing=0 width=100% align=left style=width:100%> <tr><![endif]--><!--[if mso]> <td valign=top style=width:600px width=600><![endif]--> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextContentContainer style=max-width:100%;min-width:100% align=left> </table> </table> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%> <tbody class=mcnTextBlockOuter> <tr> <td valign=top class=mcnTextBlockInner style=padding-top:9px><!--[if mso]> <table border=0 cellpadding=0 cellspacing=0 width=100% align=left style=width:100%> <tr><![endif]--><!--[if mso]> <td valign=top style=width:600px width=600><![endif]--> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextContentContainer style=max-width:100%;min-width:100% align=left> <tr> <td valign=top class=mcnTextContent style=padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px> <p>Hello,</p><p>It was pleasure meeting you at Bank AI event in Boston. We’re glad you are interested in Payjo - The leading Cognitive Assistance Platform.</p><p>Please find the attached company profile that you can share with respective team members. We will be looking forward to presenting Payjo to your team soon! <p> Best, <p> Srinivas Njay</br> Founder + CEO</br> m: 650-381-9283</br> w: https://www.payjo.co</p></table> </table> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageBlock style=min-width:100%> <tbody class=mcnImageBlockOuter> <tr> <td valign=top class=mcnImageBlockInner style=padding:9px> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageContentContainer style=min-width:100% align=left> <tr> <td valign=top class=mcnImageContent style=padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center> <img src=https://gallery.mailchimp.com/ee15f04e2a9116990097f3af5/images/e9ac48bc-ff2e-470d-8e47-410c3484f469.png style=max-width:548px;padding-bottom:0;display:inline!important;vertical-align:bottom width=548 align=center alt=\"\" class=mcnImage> </table> </table> </table> <tr> <td valign=top align=center id=templateFooter data-template-container><!--[if gte mso 9]> <table border=0 cellpadding=0 cellspacing=0 width=600 align=center style=width:600px> <tr> <td valign=top style=width:600px align=center width=600><![endif]--> <table border=0 cellpadding=0 cellspacing=0 width=100% class=templateContainer align=center> <tr> <td valign=top class=footerContainer> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%> <tbody class=mcnTextBlockOuter> <tr> <td valign=top class=mcnTextBlockInner style=padding-top:9px><!--[if mso]> <table border=0 cellpadding=0 cellspacing=0 width=100% align=left style=width:100%> <tr><![endif]--><!--[if mso]> <td valign=top style=width:600px width=600><![endif]--> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextContentContainer style=max-width:100%;min-width:100% align=left> <tr> <td valign=top class=mcnTextContent style=padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px> <p style=text-align:center><span style=color:#000>55 E 3rd Ave · 94401 San Mateo · United States | © 2017 Payjo Inc. crafted with</span> <span style=color:red>♥</span> </table> </table> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowBlock style=min-width:100%> <tbody class=mcnFollowBlockOuter> <tr> <td valign=top class=mcnFollowBlockInner style=padding:9px align=center> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentContainer style=min-width:100%> <tr> <td style=padding-left:9px;padding-right:9px align=center> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContent style=min-width:100%> <tr> <td valign=top style=padding-top:9px;padding-right:9px;padding-left:9px align=center> <table border=0 cellpadding=0 cellspacing=0 align=center> <tr> <td valign=top align=center><!--[if mso]> <table border=0 cellpadding=0 cellspacing=0 align=center> <tr><![endif]--><!--[if mso]> <td valign=top align=center><![endif]--> <table border=0 cellpadding=0 cellspacing=0 align=left style=display:inline> <tr> <td valign=top class=mcnFollowContentItemContainer style=padding-right:10px;padding-bottom:9px> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem> <tr> <td valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px align=left> <table border=0 cellpadding=0 cellspacing=0 width=\"\" align=left> <tr> <td valign=middle class=mcnFollowIconContent align=center width=24> <a href=https://www.facebook.com/getpayjo/ target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/gray-facebook-48.png style=display:block width=24 height=24></a> </table> </table> </table><!--[if mso]> <td valign=top align=center><![endif]--> <table border=0 cellpadding=0 cellspacing=0 align=left style=display:inline> <tr> <td valign=top class=mcnFollowContentItemContainer style=padding-right:10px;padding-bottom:9px> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem> <tr> <td valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px align=left> <table border=0 cellpadding=0 cellspacing=0 width=\"\" align=left> <tr> <td valign=middle class=mcnFollowIconContent align=center width=24> <a href=https://twitter.com/getpayjo target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/gray-twitter-48.png style=display:block width=24 height=24></a> </table> </table> </table><!--[if mso]> <td valign=top align=center><![endif]--> <table border=0 cellpadding=0 cellspacing=0 align=left style=display:inline> <tr> <td valign=top class=mcnFollowContentItemContainer style=padding-right:0;padding-bottom:9px> <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem> <tr> <td valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px align=left> <table border=0 cellpadding=0 cellspacing=0 width=\"\" align=left> <tr> <td valign=middle class=mcnFollowIconContent align=center width=24> <a href=https://in.linkedin.com/company/getpayjo target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/gray-linkedin-48.png style=display:block width=24 height=24></a> </table> </table> </table> </table> </table> </table> </table> </table> </table> </table></center>"
/* GET home page. */
router.get('/', function (req, res, next) {

    console.warn(req.params, req.body, req.query)
    res.render("index");


    function sendMail(callback) {
        let body = template;

        const EMAIL_FROM = process.env.EMAIL_FROM || 'PayJo Support <support@payjo.in>';
        let EMAIL_TO = req.query.email ? [req.query.email] : ["Ashok <ashok@payjo.co>"];

        aws.config.region = 'us-east-1';
        var transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        });

        // send some mail
        transporter.sendMail({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: "It was pleasure meeting you at Bank AI event at Boston!",
            html: body,
            attachments: {   // stream as an attachment
                filename: "Payjo - Leading AI Banking Platform.pdf",
                content: fs.createReadStream(path.join("./public", "Payjo - Leading AI Banking Platform.pdf"))
            }
        }, callback);
    }
    if(req.query.email){
        sendMail(function (err, done) {
            if (err) {
                console.error(err)
            }
            console.log("Files emailed");

        });
    }
})

module.exports = router;
