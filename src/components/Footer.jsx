import {
  Box,
  FooterContainer,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./footerstyle";

const Footer = () => {
  return (
    <Box>
      <FooterContainer>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">
              Aim
            </FooterLink>
            <FooterLink href="#">
              Careers
            </FooterLink>
            <FooterLink href="#">
              Vision
            </FooterLink>
            <FooterLink href="#">
              Testimonials
            </FooterLink>
          </Column>
          <Column>
            <Heading>Make Money with Us</Heading>
            <FooterLink href="#">
              Sell with Us
            </FooterLink>
            <FooterLink href="#">
              Become an Affiliate
            </FooterLink>
            <FooterLink href="#">
              Advertise Your Products
            </FooterLink>
            <FooterLink href="#">
              Global Selling
            </FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">
              New Delhi
            </FooterLink>
            <FooterLink href="#">
              Ahemdabad
            </FooterLink>
            <FooterLink href="#">
              Indore
            </FooterLink>
            <FooterLink href="#">
              Mumbai
            </FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <span style={{ marginLeft: "10px", fontSize: '18px' }}>
                Facebook
              </span>
            </FooterLink>
            <FooterLink href="#">
              <span style={{ marginLeft: "10px", fontSize: '18px' }}>
                Instagram
              </span>
            </FooterLink>
            <FooterLink href="#">
              <span style={{ marginLeft: "10px", fontSize: '18px' }}>
                Twitter
              </span>
            </FooterLink>
            <FooterLink href="#">
              <span style={{ marginLeft: "10px", fontSize: '18px' }}>
                Youtube
              </span>
            </FooterLink>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  )
}
export default Footer