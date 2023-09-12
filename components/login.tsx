import {Image} from "@nextui-org/image";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/button";

export const Login = () => {
    const CLIENT_ID = process.env.CLIENT_ID!
    const LOGIN_REDIRECT_URL = process.env.LOGIN_REDIRECT_URL!
    if (!CLIENT_ID || !LOGIN_REDIRECT_URL) {
        throw new Error(
            'Please define the CLIENT_ID or LOGIN_REDIRECT_URL environment variable inside .env.local'
        )
    }

    return (
        <Button
            href={`http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${LOGIN_REDIRECT_URL}&approval_prompt=force&scope=read`}
            as={Link}
            className={'p-0 rounded-none bg-transparent'}
        >
            <Image
                width={193}
                alt="Strava login"
                src="https://www.vozrun.club/static/img/connect-strava.d83ae0ffeb96.png"
            />
        </Button>
    );
}