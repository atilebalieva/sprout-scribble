import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Socials } from "./socials";
import { BackButton } from "./back-button";

type CardWrappersProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
};

export const AuthCard = ({ children, cardTitle, backButtonHref, backButtonLabel, showSocial }: CardWrappersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children} </CardContent>

      {showSocial && (
        <CardFooter>
          <Socials></Socials>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
