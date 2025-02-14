import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    template: `
        <div class="app-container">
            <div class="app-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: [`
        .app-container {
            border-radius: 4px;
            width: 100%;
            height: 100%;
            max-height: 100%;
            display: flex;
            overflow: hidden;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            max-width: 2000px;
            margin: 0 auto;
        }

        .app-content {
            padding: 16px;
            background-color: var(--app-bg);
            height: 100%;
            flex: 1;
            max-height: 100%;
            flex-direction: column;

        }
    `],
})
export class AppComponent {}
