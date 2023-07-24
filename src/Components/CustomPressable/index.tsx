import { Pressable, PressableProps } from "react-native";
import React from "react";

export interface Props extends PressableProps {
  children: React.ReactNode;
  applyDefaultStyle?: boolean;
}

const CustomPressable: React.FC<Props> = ({
  applyDefaultStyle = false,
  children,
  ...props
}) => {
  return (
    <Pressable
      // TODO: Review the custom colours here
      style={
        applyDefaultStyle
          ? ({ pressed }) => [
              {
                padding: 10,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: pressed ? "#7dd3fc" : "#0ea5e9",
              },
            ]
          : undefined
      }
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default CustomPressable;
