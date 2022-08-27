/* eslint-disable no-multi-spaces, no-undef */

/*
 * Data
 */
const FULLNAMES = [
    "Someone",

    "Matteo \"Byloth\" Bilotta",

    "Altaïr Ibn-La'Ahad",
    "Arthas Menethil",
    "Bruce Wayne",
    "Cole MacGrath",
    "Ezio Auditore from Firenze",
    "Geralt of Rivia",
    "Jaina Proudmoore",
    "Lt.Cdr. John Shepard",
    "Liara T'Soni",
    "宮水 三葉",      // Japanese for `Mitsuha Mihamizu`
    "Pepper Potts",
    "Lt. Simon \"Ghost\" Riley",
    "立花 瀧",      // Japanese for `Taki Tachibana`
    "Tony Stark",
    "Triss Merigold",
    "Ulfric Stormcloak",
    "Emperor Uriel Septim VII",
    "Yennefer of Vengerberg",

    "John Doe",
    "Karen Smith",
    "Mario Rossi",
    "Sofia Bianchi",
    "Ivan Ivanovich Ivanovsky",
    "Maria Papadopoulos",
    "أدهم خان",  // Arabic for `Adham Khan`
    "Akinyi Too",
    "田中 中村",     // Japanese for `Tanaka Nakamura`
    "嘉颖 杨"       // Chinese for `Jiā Yǐng Yáng`
];
const ACTIONS = [
    "did something",

    "asked something to Alexa",
    "baked some yummy cookies",
    "compulsively cleared the browser cache",
    "drank a refreshing glass of water",
    "verified a fact on Wikipedia",
    "liked a post on Facebook",
    "posted a new photo on Instagram",
    "shoot a new TikTok dance video",
    "searched something on Google",
    "desperately searched how to solve a problem on StackOverflow",
    "satisfactorily squashed an annoying mosquito",
    "woke up late for work (as usual)",

    "generously backed the Vuert project",
    "contributed to the Vuert project",
    "cloned the Vuert repository",
    "downloaded the Vuert source code",
    "forked the Vuert project on GitHub",
    "found a bug in the Vuert source code",
    "fixed a bug on the Vuert source code",
    "illigally sold Vuert as an own product",
    "installed the Vuert package in a real project",
    "landed on this awesome documentation",
    "opened a new issue on the Vuert GitHub project",
    "proudly shared the Vuert project on Twitter",
    "read all the Vuert documentation before using it",
    "reviewed the Vuert source code on GitHub",
    "starred the Vuert project on GitHub",
    "submitted a new pull request on the Vuert GitHub project"
];

/*
 * Functions
 */
const random = (min, max) =>
{
    if (max === undefined)
    {
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min)) + min;
};
const pickOne = (array) =>
{
    const length = array.length;
    const index = random(length);
    const element = array[index];

    if (element instanceof Object)
    {
        return { ...element };
    }

    return element;
};

const template = (id) => document.getElementById(id).innerHTML;

document.addEventListener("DOMContentLoaded", () =>
{
    /*
     * Vue Components
     */
    const SomeoneJust = Vue.defineComponent({
        name: "SomeoneJust",
        template: template("someone-just-template"),

        data: () => ({
            avatar: "https://picsum.photos/50",
            fullname: "",
            action: ""
        }),
        mounted: function()
        {
            this.fullname = pickOne(FULLNAMES);
            this.action = pickOne(ACTIONS);
        }
    });

    const ALERTS = [
        {
            type: "info",
            priority: "high",
            icon: "person-digging",
            title: "Work in progess!",
            message:
                "Sorry... We aren't ready yet! 🥺\n\n" +
                "Our team (it's just me) is still working on this docs page!\n" +
                "Please, be a little more patient and come back later! 👋",

            dismissable: true,
            actions: [{
                id: "confirm",
                type: "primary",
                icon: "hand-peace",
                label: "Gotcha!"
            }]
        }
    ];

    const app = Vue.createApp({
        name: "App",
        components: { "alert-handler": Vuert.AlertHandler },

        data: () => ({
            title: "Vue.js + Alert",
            hasBeenMounted: false
        }),
        mounted: function()
        {
            this.hasBeenMounted = true;

            this.emitRandomNotification();
        },

        methods: {
            emitRandomAlert()
            {
                const alert = pickOne(ALERTS);

                this.$vuert.emit(alert);
            },
            emitRandomNotification()
            {
                const delay = random(10, 30) * 1000;

                setTimeout(async () =>
                {
                    await this.$vuert.emit({
                        type: "info",
                        priority: "low",
                        component: SomeoneJust,
                        timeout: 7500
                    });

                    this.emitRandomNotification();

                }, delay);
            }
        }
    });

    app.use(Vuert.createVuert());
    app.mount("#app");
});
