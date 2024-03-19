import { Observable } from "rxjs";
import { PostCredentialsDTO, ResponseTokenDTO } from "../dto/auth.dto";


export abstract class AuthGateway {

    abstract login(credentials: PostCredentialsDTO): Observable<ResponseTokenDTO>;
    abstract logout(): void;
    abstract getTokenFromLocalStorage(): string | null;
    abstract storeTokenInLocalStorage(token: string): void;
    abstract isAuth$: Observable<boolean>;

}