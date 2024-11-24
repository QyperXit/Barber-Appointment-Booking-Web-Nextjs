export const menuAnimations = {
    wrapperVariants: {
        open: {
            scaleY: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        closed: {
            scaleY: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
            },
        },
    },

    iconVariants: {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    },

    itemVariants: {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                when: "beforeChildren",
            },
        },
        closed: {
            opacity: 0,
            y: -15,
            transition: {
                when: "afterChildren",
            },
        },
    },

    actionIconVariants: {
        open: { scale: 1, y: 0 },
        closed: { scale: 0, y: -7 },
    },
};