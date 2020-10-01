import { TestBed } from "@angular/core/testing";
import { MazeService } from './maze.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';

describe('MazeService', () => {
  let service: MazeService;
  let backend: HttpTestingController;
  let ngZone: NgZone;
  const recordsResult = [{
    score: 0,
    username: 'test',
    date: new Date(),
    mode: 'test'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MazeService ],
    });
    service = TestBed.inject(MazeService);
    backend = TestBed.inject(HttpTestingController);
    ngZone = TestBed.inject(NgZone);
  });

  describe('generateMaze', () => {
    it('should return height 14 width 44 if hard mode', () => {
      expect(service.generateMaze('settings.hard').length).toBeTruthy(14);
      expect(service.generateMaze('settings.hard')[0]).toBeTruthy(44);
    });
  });

  describe('refreshHeroLocation', () => {
    it('should refresh heroLocation', () => {
      const result = { x: 0, y: 1 };

      service.refreshHeroLocation();

      expect(service.heroLocation).toEqual(result);
    });
  });

  describe('getRecord', () => {
    it('should return records', () => {
      const mode = 'settings.medium';
      const pathMode = 'medium';

      service.getRecord(mode).subscribe(response => {
        expect(response).toEqual(recordsResult);
      });

      backend.expectOne({
        method: 'GET',
        url: `${environment.fbDBUrl}/${pathMode}.json`
      }).flush(recordsResult);
    });
  });
});
