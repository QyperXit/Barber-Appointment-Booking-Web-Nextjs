import { motion } from "framer-motion";
import { menuAnimations } from "@/app/_utils/animations/headerAnimations";

export const MenuOption = ({ text, Icon, setOpen }) => {
    return (
        <motion.li
            variants={menuAnimations.itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center w-full gap-2 p-2 text-sm font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap hover:bg-indigo-100 text-slate-700 hover:text-primary"
        >
            <motion.span variants={menuAnimations.actionIconVariants}>
                {Icon && <Icon />}
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};