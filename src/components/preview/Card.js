import React from "react";
import { useGlobalState } from "../../utils/stateContext";
import {
  CardContainer,
  Box,
  Profile,
  LetterProfile,
  Text,
  Title,
  Bio,
  LinkButtons,
  Alink,
  Btn,
} from "./CardStyling";

const Card = () => {
  const { store } = useGlobalState();
  const { links, appearance, loggedInUser } = store;

  // find newly uploaded or added profile image
  const findNewer = () => {
    const bg_img = parseInt(appearance.img_timestamp);
    const pic = parseInt(appearance.pic_timestamp);
    const newOne = Math.max(bg_img, pic);
    if (newOne === pic) {
      return appearance.picture_url;
    } else {
      return appearance.bg_image_url;
    }
  };

  return (
    <CardContainer>
      <Box>
        {appearance && (appearance.picture_url || appearance.bg_image_url) ? (
          <Profile
            alt="profile"
            src={
              (appearance.bg_image_url || appearance.picture_url) && findNewer()
            }
          />
        ) : (
          <LetterProfile>
            {loggedInUser ? loggedInUser.charAt(0).toUpperCase() : "A"}
          </LetterProfile>
        )}
        <Text>
          <Title>{appearance.profile_title}</Title>
          <Bio>{appearance.bio}</Bio>
        </Text>
        <LinkButtons>
          {links &&
            links.map((link) => (
              <Alink
                key={link.id}
                href={link.link_address}
                target="_blank"
                rel="noreferrer"
              >
                <Btn key={link.id}>{link.title}</Btn>
              </Alink>
            ))}
        </LinkButtons>
      </Box>
    </CardContainer>
  );
};

export default Card;
