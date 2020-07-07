import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "./shared/device";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { TokenService } from "../core/shared/token.service";
import { Router } from "@angular/router";
import { SortService } from "../shared/sort/sort.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public tokenService: TokenService,
    private router: Router,
    private sortservice: SortService
  ) {}
  device: Observable<any[]>;
  humidity: Observable<any[]>;
  temperature: Observable<any[]>;
  timeAgo: Observable<any[]>;
  public startTime: string;
  public lastUpdateFlag: Date;
  public currentHumidy: number;
  public currenTemperature: number;
  public currentDevice = new Device();
  public sortedImage: string;
  pubic;
  ngOnInit(): void {
    this.sortedImage = String(this.sortservice.sortNumber(1, 5));
    if (this.auth.user) {
      this.getDeviceOwner();
    }
  }

  public getDeviceOwner(): void {
    if (this.hasDeviceToken("device")) {
      // alert("tem device");
      this.currentDevice.id = this.tokenService.getToken("device");
      this.startDataListen(this.currentDevice.id);
    } else {
      // alert("nao tem device");
      this.device = this.db.list("/").valueChanges();
      let id;
      this.auth.user.subscribe((user) => {
        if (user !== null) {
          console.log(user.uid);
          id = user.uid;
        } else {
          // this.goToNotDevice();
        }
      });

      this.device.subscribe((device) => {
        this.currentDevice = device.find((item) => {
          if (item.owner === id && item.owner !== undefined) {
            console.log(item.id);
          }
          return item.owner === id && item.owner !== undefined;
        });
        console.log(this.currentDevice);
        if (this.currentDevice !== undefined) {
          this.setDeviceToken(this.currentDevice as Device);
          this.startDataListen(this.currentDevice.id);
        } else {
          const that = this;
          setTimeout(function () {
            if (this.currentDevice === undefined) {
              that.goToNotDevice();
            }
          }, 20000);
        }
      });
    }
  }

  goToNotDevice() {
    //  this.auth.auth.signOut();
    this.router.navigate(["devices/not-found"]);
  }

  startDataListen(id) {
    // this.item = this.db.list(id).valueChanges();
    this.humidity = this.db
      .list(id + "/humidity", (ref) => ref.limitToLast(1))
      .valueChanges();
    this.temperature = this.db
      .list(id + "/temperature", (ref) => ref.limitToLast(1))
      .valueChanges();
    this.timeAgo = this.db
      .list(id + "/timeAgo", (ref) => ref.limitToLast(1))
      .valueChanges();
    this.getTime();
    this.getHumidity();
    this.getTemperature();
  }

  hasDeviceToken(device) {
    return this.tokenService.hasToken(device);
  }
  setDeviceToken(device: Device) {
    this.tokenService.setToken("device", device.id);
  }

  logout() {
    this.tokenService.removeToken("device");
    this.auth.auth.signOut();
    this.router.navigate(["signin"]);
  }

  getTime(): void {
    const that = this;
    this.timeAgo.subscribe({
      next(item) {
        that.setTime();
      },
      error(msg) {
        console.log("Error Getting Location: ", msg);
      },
    });
  }

  public setTime() {
    this.lastUpdateFlag = new Date();

    this.timeAgo.subscribe((item) => {
      // console.log(Number(item[1]));
      console.log(item);
      let sec = Math.round(Number(item) / 1000);
      let minute = 0;
      let hours = 0;
      let days = 0;
      let years = 0;

      if (Number(sec) > 60) {
        // sec = Number(sec) % 60;
        const totalMinutes = Number(sec) / 60;
        hours = Math.round(totalMinutes / 60);
        minute = Math.round(totalMinutes % 60);
        sec = Number(sec) % 60;
      }

      if (hours > 24) {
        days = hours / 24;
        hours = (days * 24) % 24;
      }

      if (days > 365) {
        years = days / 365;
        days = days % 365;
      }

      console.log(
        String(days) +
          "d " +
          String(hours) +
          "h " +
          parseInt(String(minute)) +
          "m " +
          String(sec) +
          "s"
      );
      this.startTime =
        parseInt(String(days)) +
        "d " +
        parseInt(String(hours)) +
        "h " +
        parseInt(String(minute)) +
        "m " +
        String(sec) +
        "s";
    });
  }
  getHumidity() {
    this.humidity.subscribe((humidity) => {
      console.log(humidity);
      this.currentHumidy = humidity[humidity.length - 1];
    });
  }
  getTemperature() {
    this.temperature.subscribe((temperature) => {
      console.log(temperature);
      this.currenTemperature = temperature[temperature.length - 1];
    });
  }
}
