export default {

    makePhoneCall(e) {
        const phoneNumber = e.currentTarget.dataset.number;
        wx.makePhoneCall({
            phoneNumber,
        });
    },
};

