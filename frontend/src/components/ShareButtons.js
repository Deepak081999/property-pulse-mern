import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
} from 'react-share';

const ShareButtons = () => {
    const shareUrl = window.location.href;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">Share This Property</h3>
            <div className="flex gap-3">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={40} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <EmailShareButton url={shareUrl}>
                    <EmailIcon size={40} round />
                </EmailShareButton>
            </div>
        </div>
    );
};

export default ShareButtons;