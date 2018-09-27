const pubsub = (function() {
    const topics = {};
    let topicId = 0;

    return {
        publish(topic, ...props) {
            if (!topics[topic]) return;
            const subs = topics[topic];
            let len = subs.length;
            while (len--) {
                if (subs[len].callback) {
                    subs[len].callback(...props);
                } else {
                    subs.splice(len, 1);
                }
            }
        },
        subscribe(topic, callback) {
            topics[topic] = topics[topic] ? topics[topic] : [];
            const token = ++topicId;
            topics[topic].push({ token, callback });
            return token;
        },
        unsubscribe(token) {
            for (let key in topics) {
                let topic = topics[key];
                if (!topic) continue;
                for (let i = 0, len = topic.length; i < len; i++) {
                    if (topic[i] && token === topic[i].token) {
                        topic.splice(i, 1);
                    }
                }
            }
        }
    };
})();

module.exports = {
    pubsub,
}